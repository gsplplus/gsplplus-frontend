// 2026-05-22 신규 생성: ContactForm 클라이언트 컴포넌트 - 문의 폼 로직 분리
// 2026-05-22 수정: 전화번호 자동 하이픈 적용, 숫자만 입력 가능, 이메일 @ 검증 개선
"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

// 프로젝트 유형 옵션
const projectTypes = [
  { value: "", label: "선택해주세요" },
  { value: "hardware", label: "하드웨어 설계/개발" },
  { value: "software", label: "임베디드 소프트웨어" },
  { value: "integration", label: "시스템 통합 (SI)" },
  { value: "inspection", label: "점검장비/시뮬레이터" },
  { value: "automotive", label: "자동차 전장/센서" },
  { value: "other", label: "기타 문의" },
];

// 유효성 검사 패턴
const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
};

// 전화번호 포맷팅 함수 (자동 하이픈 적용)
const formatPhoneNumber = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^0-9]/g, "");
  
  // 최대 11자리로 제한
  const limited = numbers.slice(0, 11);
  
  // 포맷팅 적용
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 7) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  } else {
    // 010-XXXX-XXXX 형식
    return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
  }
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(null);

  // 전화번호 입력 핸들러 (숫자만 입력, 자동 하이픈)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  // 이메일 입력 핸들러 (@ 확인)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));
    
    // 입력 중 @ 없으면 안내 (최소 3자 이상 입력 후)
    if (value.length > 3 && !value.includes("@")) {
      setErrors((prev) => ({ ...prev, email: "이메일에 @를 포함해주세요." }));
    } else if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // 일반 입력 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 유효성 검사
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "이름을 2자 이상 입력해주세요.";
    }

    if (!PATTERNS.email.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (formData.phone && !PATTERNS.phone.test(formData.phone.replace(/-/g, ""))) {
      newErrors.phone = "올바른 전화번호 형식을 입력해주세요.";
    }

    if (!formData.projectType) {
      newErrors.projectType = "프로젝트 유형을 선택해주세요.";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "문의 내용을 10자 이상 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 제출 핸들러 (API 호출)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectType: "",
          message: "",
        });
      } else {
        setSubmitResult("error");
      }
    } catch {
      setSubmitResult("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <h2>문의하기</h2>
        <p>프로젝트 개요를 알려주시면 더 정확한 상담이 가능합니다.</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            이름 <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="홍길동"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            이메일 <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            placeholder="example@company.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            전화번호
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            inputMode="numeric"
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="company" className={styles.label}>
            회사/기관명
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="회사명 (선택)"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="projectType" className={styles.label}>
          프로젝트 유형 <span className={styles.required}>*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className={`${styles.select} ${errors.projectType ? styles.inputError : ""}`}
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <span className={styles.errorText}>{errors.projectType}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          문의 내용 <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="프로젝트 개요, 요구사항, 예상 일정, 예산 범위 등을 알려주세요."
          className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={styles.spinner} />
            전송 중...
          </>
        ) : (
          "문의하기"
        )}
      </button>

      {submitResult === "success" && (
        <div className={styles.successMessage}>
          <span className={styles.successIcon}>✓</span>
          <div>
            <strong>문의가 접수되었습니다.</strong>
            <p>입력하신 이메일로 접수 확인 메일이 발송되었습니다.</p>
            <p>전화번호를 입력하셨다면 SMS 안내 문자도 발송됩니다.</p>
            <p className={styles.responseTime}>1영업일 내 담당자가 연락드립니다.</p>
          </div>
        </div>
      )}

      {submitResult === "error" && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>!</span>
          <div>
            <strong>전송에 실패했습니다.</strong>
            <p>잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      )}
    </form>
  );
}
