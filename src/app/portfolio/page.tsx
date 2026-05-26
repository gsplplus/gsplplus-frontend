// 2026-05-22 신규 생성: 포트폴리오 페이지 - 프로젝트 갤러리
"use client";

import { useState } from "react";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import styles from "./page.module.css";

// 프로젝트 카테고리
const categories = [
  { id: "all", label: "전체" },
  { id: "hardware", label: "하드웨어" },
  { id: "software", label: "소프트웨어" },
  { id: "integration", label: "시스템 통합" },
  { id: "automotive", label: "자동차 전장" },
  { id: "inspection", label: "점검장비" },
];

// 포트폴리오 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: "안마기 신제품 PCB 및 검사 지그 개발",
    category: "inspection",
    year: "2025",
    client: "A사",
    description: "안마기 제품군의 신규 PCB 설계 및 양산 검사를 위한 자동화 지그 개발",
    tags: ["PCB 설계", "검사 지그", "자동화"],
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "드론용 파워/통신/센싱 보드 개발",
    category: "hardware",
    year: "2024",
    client: "B사",
    description: "드론 비행을 위한 전원 관리, 통신 모듈, 센서 통합 보드 설계 및 개발",
    tags: ["드론", "전원 관리", "센서 통합"],
    color: "#10b981",
  },
  {
    id: 3,
    title: "낙하산 시뮬레이터 전장 설치",
    category: "integration",
    year: "2023",
    client: "C기관",
    description: "낙하산 훈련용 시뮬레이터의 전장 시스템 설계 및 설치",
    tags: ["시뮬레이터", "전장 설계", "훈련 장비"],
    color: "#8b5cf6",
  },
  {
    id: 4,
    title: "오토바이 무선충전 거치대 양산",
    category: "hardware",
    year: "2022",
    client: "D사",
    description: "오토바이용 스마트폰 무선충전 거치대 설계부터 양산까지 진행",
    tags: ["무선충전", "양산", "IoT"],
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "전기자동차 WSS 센서 개발",
    category: "automotive",
    year: "2024",
    client: "E자동차",
    description: "전기자동차용 휠 속도 센서(WSS) 설계 및 신호 처리 알고리즘 개발",
    tags: ["EV", "센서", "신호 처리"],
    color: "#ef4444",
  },
  {
    id: 6,
    title: "공장 자동화 제어 시스템",
    category: "integration",
    year: "2023",
    client: "F제조",
    description: "스마트 팩토리 구현을 위한 PLC 기반 제어 시스템 구축",
    tags: ["스마트 팩토리", "PLC", "자동화"],
    color: "#06b6d4",
  },
  {
    id: 7,
    title: "의료기기 펌웨어 개발",
    category: "software",
    year: "2024",
    client: "G의료",
    description: "의료용 모니터링 장비의 임베디드 펌웨어 개발 및 인증 획득",
    tags: ["의료기기", "펌웨어", "인증"],
    color: "#ec4899",
  },
  {
    id: 8,
    title: "배터리 관리 시스템 (BMS)",
    category: "automotive",
    year: "2023",
    client: "H에너지",
    description: "전기차 및 ESS용 배터리 관리 시스템 하드웨어/소프트웨어 개발",
    tags: ["BMS", "배터리", "전기차"],
    color: "#84cc16",
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* 히어로 섹션 */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Portfolio</p>
            <h1 className={styles.heroTitle}>포트폴리오</h1>
            <p className={styles.heroLead}>
              가스펠플러스가 수행한 다양한 프로젝트를 소개합니다.
              <br />
              하드웨어부터 소프트웨어, 시스템 통합까지 폭넓은 경험을 확인하세요.
            </p>
          </div>
        </section>

        {/* 필터 탭 */}
        <section className={styles.filterSection}>
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterTab} ${
                  activeCategory === cat.id ? styles.filterTabActive : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* 프로젝트 그리드 */}
        <section className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className={styles.projectCard}
                style={
                  {
                    "--accent-color": project.color,
                    "--delay": `${index * 0.1}s`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.projectHeader}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <span className={styles.projectClient}>{project.client}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.projectFooter}>
                  <span className={styles.projectCategory}>
                    {categories.find((c) => c.id === project.category)?.label}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 통계 섹션 */}
        <section className={styles.statsSection}>
          <div className={styles.statsInner}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>100+</span>
              <span className={styles.statLabel}>완료된 프로젝트</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>50+</span>
              <span className={styles.statLabel}>협력 기업</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>10+</span>
              <span className={styles.statLabel}>년 경력</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>99%</span>
              <span className={styles.statLabel}>고객 만족도</span>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <CTASection
          title="비슷한 프로젝트가 필요하신가요?"
          subtitle="귀사의 요구사항에 맞는 최적의 솔루션을 제안해 드립니다. 무료 상담을 통해 프로젝트를 시작하세요."
          variant="gradient"
        />
      </main>
    </div>
  );
}
