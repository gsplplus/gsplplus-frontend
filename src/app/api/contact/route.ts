// 2026-05-22 신규 생성: Contact API - 이메일/SMS 발송
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 회사 정보
const COMPANY_EMAIL = "eskypia122@e-skypia.com";
const COMPANY_PHONE = "010-8685-9123";

// 이메일 전송 설정 (Gmail SMTP 예시)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 문의 데이터 타입
interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  message: string;
}

// 프로젝트 유형 라벨
const projectTypeLabels: Record<string, string> = {
  hardware: "하드웨어 설계/개발",
  software: "임베디드 소프트웨어",
  integration: "시스템 통합 (SI)",
  inspection: "점검장비/시뮬레이터",
  automotive: "자동차 전장/센서",
  other: "기타 문의",
};

// 고객에게 보내는 확인 이메일 템플릿
const createCustomerEmailHtml = (data: ContactData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #F57C00, #FF5722); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    h1 { margin: 0; font-size: 24px; }
    .highlight { color: #F57C00; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>GSPLPLUS 문의 접수 확인</h1>
    </div>
    <div class="content">
      <p><strong>${data.name}</strong>님, 안녕하세요.</p>
      <p>가스펠플러스(GSPLPLUS)에 문의해 주셔서 감사합니다.</p>
      <p>귀하의 문의가 <span class="highlight">정상적으로 접수</span>되었습니다.</p>
      
      <div class="info-box">
        <h3>📋 접수된 문의 내용</h3>
        <p><strong>성함:</strong> ${data.name}</p>
        <p><strong>이메일:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>연락처:</strong> ${data.phone}</p>` : ""}
        ${data.company ? `<p><strong>회사/기관:</strong> ${data.company}</p>` : ""}
        <p><strong>문의 유형:</strong> ${projectTypeLabels[data.projectType] || data.projectType}</p>
        <p><strong>문의 내용:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
      
      <p>담당자가 확인 후 <span class="highlight">1영업일 내</span>에 연락드리겠습니다.</p>
      <p>추가 문의사항이 있으시면 아래 연락처로 연락주세요.</p>
      
      <div class="info-box">
        <p>📞 전화: 042-000-0000</p>
        <p>📧 이메일: ${COMPANY_EMAIL}</p>
        <p>🏢 주소: 대전광역시 유성구 배울1로 277, 4동</p>
      </div>
    </div>
    <div class="footer">
      <p>© 2015-2026 GSPLPLUS. All rights reserved.</p>
      <p>임베디드 하드웨어·소프트웨어 전문 엔지니어링 기업</p>
    </div>
  </div>
</body>
</html>
`;

// 회사로 보내는 알림 이메일 템플릿
const createCompanyEmailHtml = (data: ContactData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0f172a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #eee; }
    .label { font-weight: bold; width: 120px; color: #666; }
    .value { flex: 1; }
    .urgent { background: #FFF3E0; border-left: 4px solid #F57C00; padding: 15px; margin-top: 20px; }
    h1 { margin: 0; font-size: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 새로운 문의가 접수되었습니다</h1>
    </div>
    <div class="content">
      <p>홈페이지를 통해 새로운 문의가 접수되었습니다.</p>
      
      <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div class="info-row">
          <span class="label">성함</span>
          <span class="value">${data.name}</span>
        </div>
        <div class="info-row">
          <span class="label">이메일</span>
          <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
        </div>
        ${data.phone ? `
        <div class="info-row">
          <span class="label">연락처</span>
          <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
        </div>
        ` : ""}
        ${data.company ? `
        <div class="info-row">
          <span class="label">회사/기관</span>
          <span class="value">${data.company}</span>
        </div>
        ` : ""}
        <div class="info-row">
          <span class="label">문의 유형</span>
          <span class="value">${projectTypeLabels[data.projectType] || data.projectType}</span>
        </div>
        <div class="info-row" style="border-bottom: none;">
          <span class="label">문의 내용</span>
          <span class="value">${data.message.replace(/\n/g, "<br>")}</span>
        </div>
      </div>
      
      <div class="urgent">
        <strong>⏰ 1영업일 내 회신이 필요합니다.</strong>
      </div>
    </div>
  </div>
</body>
</html>
`;

// SMS 발송 함수 (실제 구현 시 SMS API 서비스 연동 필요)
async function sendSMS(phone: string, message: string): Promise<boolean> {
  // SMS 발송 API 연동 (예: 알리고, NHN Cloud, Twilio 등)
  // 실제 구현 시 아래 주석 해제 및 API 키 설정 필요
  
  /*
  const API_KEY = process.env.SMS_API_KEY;
  const response = await fetch("https://sms-api-url/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: API_KEY,
      to: phone.replace(/-/g, ""),
      message: message,
    }),
  });
  return response.ok;
  */
  
  console.log(`[SMS 발송 예정] To: ${phone}, Message: ${message}`);
  return true; // 개발 환경에서는 항상 성공 반환
}

export async function POST(request: Request) {
  try {
    const data: ContactData = await request.json();
    
    // 유효성 검사
    if (!data.name || !data.email || !data.projectType || !data.message) {
      return NextResponse.json(
        { success: false, error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const results = {
      customerEmail: false,
      companyEmail: false,
      customerSMS: false,
      companySMS: false,
    };

    // 1. 고객에게 확인 이메일 발송
    try {
      if (process.env.SMTP_USER) {
        await transporter.sendMail({
          from: `"GSPLPLUS" <${process.env.SMTP_USER}>`,
          to: data.email,
          subject: "[GSPLPLUS] 문의가 접수되었습니다",
          html: createCustomerEmailHtml(data),
        });
        results.customerEmail = true;
      }
    } catch (emailError) {
      console.error("고객 이메일 발송 실패:", emailError);
    }

    // 2. 회사로 알림 이메일 발송
    try {
      if (process.env.SMTP_USER) {
        await transporter.sendMail({
          from: `"GSPLPLUS 웹사이트" <${process.env.SMTP_USER}>`,
          to: COMPANY_EMAIL,
          subject: `[웹사이트 문의] ${data.name}님 - ${projectTypeLabels[data.projectType] || "기타"}`,
          html: createCompanyEmailHtml(data),
          replyTo: data.email,
        });
        results.companyEmail = true;
      }
    } catch (emailError) {
      console.error("회사 이메일 발송 실패:", emailError);
    }

    // 3. 고객에게 SMS 발송 (전화번호가 있는 경우)
    if (data.phone) {
      try {
        const customerSmsMessage = `[GSPLPLUS] ${data.name}님, 문의가 접수되었습니다. 1영업일 내 담당자가 연락드리겠습니다.`;
        results.customerSMS = await sendSMS(data.phone, customerSmsMessage);
      } catch (smsError) {
        console.error("고객 SMS 발송 실패:", smsError);
      }
    }

    // 4. 회사로 SMS 알림 발송
    try {
      const companySmsMessage = `[웹문의] ${data.name}님(${data.phone || data.email}) - ${projectTypeLabels[data.projectType] || "기타"}`;
      results.companySMS = await sendSMS(COMPANY_PHONE, companySmsMessage);
    } catch (smsError) {
      console.error("회사 SMS 발송 실패:", smsError);
    }

    // 결과 반환
    return NextResponse.json({
      success: true,
      message: "문의가 성공적으로 접수되었습니다.",
      results,
    });

  } catch (error) {
    console.error("Contact API 오류:", error);
    return NextResponse.json(
      { success: false, error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
