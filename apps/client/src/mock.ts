export type TQuizProblem = {
  id: number
  type: string
  question: string
  options?: string[]
  answer: string | null
  solution: string | null
}

export const mockData: TQuizProblem[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'React에서 상태(State)를 변경할 때 사용하는 함수는 무엇인가요?',
    answer: 'setState()',
    solution:
      'React 컴포넌트의 상태를 업데이트하기 위해 사용되는 함수는 setState()입니다.',
    options: ['updateState()', 'modifyState()', 'setState()', 'changeState()'],
  },
  {
    id: 2,
    type: 'short-answer',
    question: 'Typescript의 주요 특징은 무엇인가요?',
    answer: '정적 타입 체크 기능과 타입 추론 기능을 제공한다.',
    solution:
      'Typescript는 자바스크립트에 정적 타입을 추가하여 코드의 안정성을 높이는데 도움을 줍니다.',
  },
  {
    id: 3,
    type: 'essay',
    question: 'React Query와 Recoil의 차이점은 무엇인가요?',
    answer:
      'React Query는 데이터를 가져오고 캐싱하는 데 사용되며, Recoil은 전역 상태 관리 라이브러리입니다.',
    solution:
      'React Query는 서버로부터 데이터를 가져오고 관리하는 데 사용되는 라이브러리이며, Recoil은 React 애플리케이션의 전역 상태를 관리하는데 사용됩니다.',
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Emotion과 Styled-components의 공통점은 무엇인가요?',
    answer: 'CSS-in-JS 라이브러리이다.',
    solution:
      'Emotion과 Styled-components는 CSS-in-JS 방식으로 스타일을 적용하는 라이브러리입니다.',
    options: [
      'CSS 프레임워크이다.',
      '웹 서버를 관리하는 라이브러리이다.',
      'CSS-in-JS 라이브러리이다.',
      '웹 소켓을 구현하는 라이브러리이다.',
    ],
  },
  {
    id: 5,
    type: 'short-answer',
    question: 'Axios는 무엇을 위한 라이브러리인가요?',
    answer: 'HTTP 클라이언트 라이브러리이다.',
    solution:
      'Axios는 브라우저와 Node.js를 위한 HTTP 클라이언트 라이브러리로, 서버와 통신하는 데 사용됩니다.',
  },
  {
    id: 6,
    type: 'essay',
    question: 'React Router의 역할은 무엇이며, 어떻게 사용되나요?',
    answer:
      'React Router는 React 애플리케이션의 라우팅을 관리하는데 사용되며, URL과 컴포넌트를 매핑하여 페이지를 렌더링한다.',
    solution:
      'React Router는 사용자의 요청에 따라 적절한 컴포넌트를 렌더링하여 SPA(Single Page Application)의 라우팅을 관리합니다.',
  },
  {
    id: 7,
    type: 'multiple-choice',
    question:
      'React에서 상태(State)를 관리하는 방법 중 하나가 아닌 것은 무엇인가요?',
    answer: 'Redux',
    solution:
      'React에서 상태를 관리하는 방법으로 Redux, Context API, useState 등이 있지만 Redux는 별도의 상태 관리 라이브러리이다.',
    options: ['Context API', 'Redux', 'useState', 'useReducer'],
  },
  {
    id: 8,
    type: 'short-answer',
    question: 'Typescript의 주요 장점은 무엇인가요?',
    answer: '정적 타입 검사를 통해 런타임 에러를 줄일 수 있다.',
    solution:
      'Typescript는 정적 타입 검사를 통해 개발자가 런타임 에러를 사전에 방지할 수 있는 장점을 가지고 있습니다.',
  },
  {
    id: 9,
    type: 'essay',
    question: 'React Query와 Axios의 차이점은 무엇인가요?',
    answer:
      'React Query는 데이터를 가져오고 캐싱하는 데 사용되며, Axios는 HTTP 요청을 보내는 데 사용된다.',
    solution:
      'React Query는 데이터 가져오기와 관리에 특화된 라이브러리이며, Axios는 HTTP 클라이언트로 다양한 종류의 요청을 보낼 수 있습니다.',
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: 'Recoil과 Context API의 공통점은 무엇인가요?',
    answer: 'React 애플리케이션의 전역 상태를 관리하는 데 사용된다.',
    solution:
      'Recoil과 Context API는 React 애플리케이션의 전역 상태를 효율적으로 관리하는 데 사용되는 방법입니다.',
    options: [
      'UI를 디자인하는데 사용된다.',
      '페이지 간 이동을 관리하는데 사용된다.',
      'React 컴포넌트를 생성하는 데 사용된다.',
      'React 애플리케이션의 전역 상태를 관리하는 데 사용된다.',
    ],
  },
  {
    id: 11,
    type: 'short-answer',
    question: 'Emotion의 주요 특징은 무엇인가요?',
    answer: 'CSS-in-JS 라이브러리이며, 간편한 문법을 제공한다.',
    solution:
      'Emotion은 CSS-in-JS 방식으로 스타일을 작성할 수 있으며, 간결하고 표현력이 뛰어난 문법을 제공합니다.',
  },
  {
    id: 12,
    type: 'essay',
    question: 'Styled-components와 Emotion의 차이점은 무엇인가요?',
    answer:
      'Styled-components는 컴포넌트 스타일을 정의할 때 태그 리터럴을 사용하고, Emotion은 css 속성을 사용한다.',
    solution:
      'Styled-components는 자바스크립트의 태그 리터럴을 활용하여 컴포넌트 스타일을 정의하는 반면, Emotion은 일반적인 CSS 속성을 사용하여 스타일을 작성합니다.',
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'React Router가 제공하는 주요 기능은 무엇인가요?',
    answer: 'SPA(Single Page Application)의 라우팅을 관리한다.',
    solution:
      'React Router는 사용자의 요청에 따라 적절한 컴포넌트를 렌더링하여 SPA의 라우팅을 관리합니다.',
    options: [
      '웹 페이지의 디자인을 관리한다.',
      '서버와의 통신을 관리한다.',
      '애니메이션을 처리한다.',
      'SPA의 라우팅을 관리한다.',
    ],
  },
  {
    id: 14,
    type: 'short-answer',
    question: 'React Query의 주요 특징은 무엇인가요?',
    answer: '데이터를 가져오고 관리하는 데 사용됩니다.',
    solution:
      'React Query는 서버로부터 데이터를 가져오고 캐시하여 관리하는 데 사용되는 라이브러리입니다.',
  },
  {
    id: 15,
    type: 'essay',
    question: 'Recoil과 Redux의 차이점은 무엇인가요?',
    answer:
      'Recoil은 React 애플리케이션의 상태 관리를 위한 라이브러리이며, Redux는 독립적인 상태 관리 라이브러리이다.',
    solution:
      'Recoil은 React의 내장 상태 관리 라이브러리로, Redux와 달리 별도의 라이브러리를 추가로 설치할 필요가 없습니다.',
  },
]
