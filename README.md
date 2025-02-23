![Image](https://github.com/user-attachments/assets/ef435e46-5c3d-49bd-b9a1-acfdec38af4d)

# 퇴사몬 (Goodbye-Stress Monster)

**“오늘 하루 열심히 일한 당신, 회사에서의 스트레스는 어떻게 해소하고 계신가요?”**

_‘퇴사하고 싶다’_   
오늘도 이 한마디를 무심결에 떠올리진 않으셨나요?  

많은 사람들과 관계를 맺고, 맡은 역할을 해내야 하는 직장 생활,  
우리는 감정과 스트레스를 바로 해소하지 못한 채 사회 속의 나로 생활합니다.

하루하루 쌓여 털어놓기 힘들었던 고충을 담아,  
👾 **나만의 퇴사몬** 👾 을 만들어 스트레스를 해소해보는 것은 어떨까요?

</br>

## 📚 프로젝트 개요

- **활동 기간** : 2024.04 ~ 2024.09 
- **참여 인원** : PO, 백엔드(1), 프론트엔드(2), 디자이너, 마케터 (총 6명)
- **프로젝트 소개**

    - 2030 직장인들을 대상으로, 자신의 스트레스를 귀여운 몬스터에 투영하여 감정에 따라 인터렉션하고, 친구들과 공유하여 응원의 메시지를 주고 받으며 이를 해소하는 서비스  
    - 퇴사를 독려하는 게 아닌, 퇴사하고 싶은 순가의 감정을 누군가와 나누며 해소하기를 바라는 마음에서 시작한 프로젝트
    
## ⚙️ 기술 스택
<img width="911" alt="Image" src="https://github.com/user-attachments/assets/3dfdb389-8738-40a6-9c64-afcc9c47160d" />

## 🔹 유저 플로우 
![image](https://github.com/user-attachments/assets/ff32dad7-b49a-41fb-aa1e-d420e1dab24a)

## 💡 주요 기능 
![image](https://github.com/user-attachments/assets/e8f37197-ffa8-4476-8aca-1e304a6dc837)
![image](https://github.com/user-attachments/assets/a2fb3f49-e897-4bc4-ba5d-a1f364ae6037)
![image](https://github.com/user-attachments/assets/f727d4e9-ddbe-4cad-867b-e25d260ad72a)
![image](https://github.com/user-attachments/assets/ff8e556a-4524-4d44-ae59-48e6c042db26)
![image](https://github.com/user-attachments/assets/6c75168a-583d-49b3-8a13-fef5b75c486d)

### 프로젝트 타임라인 

- 2025.04 · **기획 · 설계**
    <small>
    - 아이데이션 
    - 문제 정의 및 가설 검증 
        - Google Form를 활용한 사용자 설문 조사 (03.28 ~ 03.29 / 양일간 진행) → [~~(종료) 구글 폼~~](https://forms.gle/SV6mrN7hEYckWYR78)
            - 일반인 대상, <u>총 82명 참여</u> 
    - 사용자 시나리오 작성 
    - 와이어 프레임 및 기능 정의서 작성 
    - 디자인 가이드 및 컴포넌트 제작
    - 프로젝트 설계 및 개발 환경 세팅 
        - Git 브랜치 전략 수립 → Github-flow 채택 (상시 배포)
        - GitHub Issue & PR Template 설정
        - Husky + Lint-staged 기반 컨벤션 및 린트 검사 자동화 설정
    </small>
   
- 2024.05 · **MVP 개발** 
    <small>
    - 페이크 랜딩 테스트 (5.29 ~ 06.03 / 총 6일간 진행) → [직장인 ver](https://quitmon.webflow.io/) | [대학생 ver](https://myeonngeuns-wondrous-site-27e54bd11789d.webflow.io/)
        - 메인 타겟 선정 및 시장 호응도 검증 
        - Google Analytics 연동, 방문율과 전환율 집계
            - 목표 전환율 2% 이상인 <u>9.15% 도달</u> 📈
            - 기간 내 콘텐츠 조회 3918회, 랜딩 페이지 클릭 142회, 이메일 수집 13건 달성 
    - API 설계 및 서버/DB 배포 
        - Spring REST Docs 기반 API 명세 자동화
    - 디자인 시스템 및 공통 컴포넌트 구축 
        - 피그마 디자인 토큰 구조화 (JSON)
        - Style Dictionary를 활용한 **디자인 토큰 가공 자동화**  (CSS Variables, Tailwind Preset 연동)
        - Button, Input 등 핵심 UI 컴포넌트 설계 및 Variant 기반 확장성 확보
            - clsx, tailwind-merge를 활용한 `cn()` 유틸리티 함수 정의 및 적용
            - Class-Variance-Authority(CVA)를 활용한 클래스 기반 **조건부 스타일링** 적용
    - 로그인 기능 개발 (OAuth 2.0)
        - 로그인 API 및 카카오 로그인 연동 (REST API)
        - 미들웨어 체인을 통한 비로그인 사용자 방어 로직 구현 
    - 링크 공유 및 카카오톡 공유 기능 개발(SDK)
        - HTTPS 및 Safari 환경: Web Share API를 활용한 클립보드 복사
        - 미지원 환경: Clipboard API를 이용한 대체 구현
    </small> 

- 2024.06 · **MVP 배포 및 시연**
    <small>
    - 퇴사몬 생성 페이지 개발  
        - useFunnel 구현을 통한 퍼널(Funnel) 패턴 적용, 단계별 회원 가입 흐름 구현
        - React Hook form을 활용한 폼 상태 및 유효성 검사 적용
    - 퇴사몬 관리 페이지 개발
    - 설정 페이지 개발 
    </small>

- 2024.07
    <small>
    - 디자인 QA 진행 및 이슈 픽스
    - 팀원 대상 QA 진행 및 버그 픽스
    - 데모데이 진행 (오프라인)
        - 프레젠테이션 및 테스트 부스 운영
            - Slido를 통한 실시간 Q&A 및 피드백 수집  
            - 프로그라피 9기 참여 전체 9팀 중 <u>최종 1위 수상</u> 🏅
    </small>

- 2024.08 ~ 09 · **정식 출시 및 서비스 운영**
    <small>
    - 온보딩 페이지 제작 
    - 사용자 행동 추적 및 분석을 위한 Google Tag Manager 연동  
    - 출시 알림 신청자 대상 베타 테스트 진행 
    - 커뮤니티 홍보 및 인스타그램 광고 집행
    - 운영 이슈 대응 및 서비스 기능 고도화 
    </small>

### 👩‍💻🧑‍💻 프로젝트 기여 및 역할

| 이름 | 주요 역할 |
| --- | --- |
| 임아영 | 디자인 시스템 구축 및 공통 컴포넌트 설계, 플립 카드 컴포넌트 생성, 링크 공유 및 카카오톡 공유 기능 구현(SDK) |
| 윤석규 | 로그인 시스템 및 회원가입 flow 설계, 홈 화면 메시지 바텀 컴포넌트 생성, 미들웨어 로직 작성 |

### 팀 소개 
<table>
    <tr>
        <td align=center >
            <img src="https://github.com/user-attachments/assets/e633c57b-c039-49d0-bbba-b5e39bddd3b4" width="75px" style="border-radius: 999px;"/>
        </td>
        <td align=center>
            <img src="https://media.disquiet.io/images/profile/8ce67e464700671a76331fa70a3fb3a51c68c95a03f4ebbea63309338cded89d" width="75px" style="border-radius: 999px;"/>
        </td>
        <td align=center>
            <img src="https://github.com/user-attachments/assets/b9e1eccc-21be-4bb4-8476-799b33a8d6c3" width="75px" style="border-radius: 999px;"/>
        </td>
    </tr>
    <tr>
        <td align=center >
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 700; line-height: 120%;">이명은</span>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 400; line-height: 120%;">· PO</span>
        </td>
        <td align=center>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 700; line-height: 120%;">신수민</span>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 400; line-height: 120%;">· Marketer</span>
        </td>
        <td align=center>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 700; line-height: 120%;">조미현</span>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 400; line-height: 120%;">· Product Designer</span>
        </td>
    </tr>
    <tr>
        <td align=center>
            <a href="https://github.com/62hoon99">
                <img src="https://avatars.githubusercontent.com/u/98267772?v=4" width="75px" style="border-radius: 999px;" />
            </a>
        </td>
        <td align=center>
            <a href="https://github.com/dbstjrrb12">
                <img src="https://avatars.githubusercontent.com/u/49303508?v=4" width="75px" style="border-radius: 999px;" />
            </a>
        </td>
        <td align=center>
            <a href="https://github.com/emayom">
                <img src="https://avatars.githubusercontent.com/u/85545101?v=4" width="75px"  style="border-radius: 999px;" />
            </a>
        </td>
    </tr>
     <tr>
        <td align=center>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 700; line-height: 120%;">유기훈</span>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 400; line-height: 120%;">· BE Developer</span>
        </td>
        <td align=center>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 700; line-height: 120%;">윤석규</span>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 400; line-height: 120%;">· FE Developer</span>
        </td>
        <td align=center>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 700; line-height: 120%;">임아영</span>
            <span style="letter-spacing: -.3px; font-family: Product Sans; font-size: 12px; font-weight: 400; line-height: 120%;">· FE Developer</span>
        </td>
    </tr>
</table>
