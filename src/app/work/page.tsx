// 2026-05-22 수정: CTA 섹션 추가, 메타데이터 추가
import type { Metadata } from "next";
import CTASection from "@/components/sections/CTASection";
import sharedStyles from "../detail-page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "서비스",
  description:
    "가스펠플러스(GSPLPLUS)의 주요 서비스를 소개합니다. 임베디드 하드웨어, 소프트웨어, 시스템 통합, 자동차 전장 개발까지 원스톱 서비스를 제공합니다.",
};

const coreBusiness = [
  {
    key: "platform",
    badge: "플랫폼",
    title: "임베디드 플랫폼 / BT 5.0",
    summary:
      "프로세서와 MCU 기반 하드웨어 설계부터 정밀 센서와 통신 모듈 개발까지 수행합니다.",
    items: [
      "NXP, TI, STM, AVR 기반 설계 및 최적화",
      "정밀 센서 모듈 설계 및 개발",
      "Bluetooth / Wi-Fi 통신용 하드웨어·소프트웨어 개발",
      "시뮬레이터 입출력 시스템 및 패널 개발",
    ],
  },
  {
    key: "software",
    badge: "소프트웨어",
    title: "임베디드 소프트웨어·모바일",
    summary:
      "OS 포팅, 펌웨어, 모바일과 PC 애플리케이션까지 연결해 제어 경험을 완성합니다.",
    items: [
      "Non-OS, WinCE, Embedded Linux 포팅",
      "펌웨어 개발",
      "PC·모바일 기반 앱 개발",
      "제어 및 관제 소프트웨어 구현",
    ],
  },
  {
    key: "si",
    badge: "통합",
    title: "시스템 통합(SI)",
    summary:
      "장비와 소프트웨어를 함께 묶어 실제 현장에서 사용할 수 있는 통합 시스템을 만듭니다.",
    items: [
      "점검장비용 PC 애플리케이션 개발",
      "시스템 SI 개발 및 통합 솔루션 구현",
      "웹 기반 프로그램 솔루션 제공",
    ],
  },
  {
    key: "automotive",
    badge: "자동차",
    title: "자동차 전장 / 자율주행 센서",
    summary:
      "자동차 센서 분야에서 신호 측정과 모듈 설계 역량을 바탕으로 제품을 개발합니다.",
    items: [
      "HR WSS 기반 센서 시스템 개발",
      "지능형 베어링 파형 센서 모듈 개발",
    ],
  },
];

const businessFields = [
  "입출력 시스템 보드 개발",
  "원격의료 하드웨어 개발",
  "Bluetooth 4.0 / 5.0 / Wi-Fi 응용 제품 개발",
  "의료기기, 복강경, 스마트 체온계 개발",
  "HR WSS / 휠 파형 센서류 개발",
  "PCB 및 조립 단품 검사 장비 설계 제작",
  "훈련장비 전장 설계 제작 및 설치",
  "UH60FFS / LYNX FMS 정비",
];

const products = [
  "DI, AI, 디스플레이 입출력 보드",
  "아날로그 제어 계기패널 제어보드",
  "온도 / 압력 / 진동 / IR / 수질 / 가스 / 홀 센서보드",
  "산업용 PCB 검사 시스템",
  "산업용 단품 검사 시스템",
];

export default function WorkPage() {
  return (
    <div className={sharedStyles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroHeader}>
            <p className={styles.eyebrow}>하는 일</p>
            <h1>주요 사업 영역</h1>
          </div>

          <div className={styles.heroBody}>
            <div className={styles.heroCopy}>
              <p className={styles.heroLead}>
                GSPLPLUS는 임베디드 시스템을 기반으로 하드웨어, 소프트웨어,
                시스템을 개발하고 생산 및 납품까지 이어지는 원스톱 서비스를
                제공합니다.
              </p>
              <div className={styles.heroHighlights} aria-label="핵심 흐름">
                <span>하드웨어</span>
                <span>소프트웨어</span>
                <span>시스템 통합</span>
                <span>생산</span>
              </div>
            </div>

            <div className={styles.heroVisual} aria-hidden="true">
              <div className={`${styles.visualNode} ${styles.visualTopLeft}`}>
                <strong>임베디드</strong>
                <span>플랫폼 · BT</span>
              </div>
              <div className={`${styles.visualNode} ${styles.visualTopRight}`}>
                <strong>임베디드</strong>
                <span>소프트웨어 · 모바일</span>
              </div>
              <div className={`${styles.visualNode} ${styles.visualBottomLeft}`}>
                <strong>시스템</strong>
                <span>통합</span>
              </div>
              <div className={`${styles.visualNode} ${styles.visualBottomRight}`}>
                <strong>자동차</strong>
                <span>센서</span>
              </div>
              <div className={styles.visualCenter}>
                <div className={styles.visualRing}>
                  <span>핵심 사업</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.core} aria-labelledby="core-business-title">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>핵심 사업</p>
            <h2 id="core-business-title">사업 역량</h2>
          </div>

          <div className={styles.coreGrid}>
            {coreBusiness.map((area) => (
              <article className={styles.coreCard} key={area.title}>
                <div className={styles.coreCardHeader}>
                  <span className={`${styles.coreBadge} ${styles[`${area.key}Badge`]}`}>
                    {area.badge}
                  </span>
                  <h3>{area.title}</h3>
                </div>
                <p className={styles.coreSummary}>{area.summary}</p>
                <ul className={styles.coreList}>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.catalog} aria-labelledby="business-fields-title">
          <article className={styles.board}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>세부 사업 분야</p>
              <h2 id="business-fields-title">사업 분야</h2>
            </div>
            <ul className={styles.boardList}>
              {businessFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.board}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>주요 제품</p>
              <h2>개발 보유 제품</h2>
            </div>
            <ul className={styles.boardList}>
              {products.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* CTA 섹션 */}
        <CTASection
          title="맞춤형 솔루션이 필요하신가요?"
          subtitle="프로젝트 요구사항에 맞는 최적의 기술 솔루션을 제안해 드립니다."
          variant="gradient"
        />
      </main>
    </div>
  );
}
