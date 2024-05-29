export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/prompt',
  },
  {
    path: '/prompt',
    name: '系统Prompt管理',
    icon: 'setting',
    routes: [
      {
        path: '/prompt',
        redirect: '/prompt/systemPrompt',
      },
      {
        path: '/prompt/systemPrompt',
        name: '系统Prompt列表',
        component: './SystemPrompt/SystemPrompt',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/score',
    name: '评分管理',
    icon: 'setting',
    routes: [
      {
        path: '/score',
        redirect: '/score/score',
      },
      {
        path: '/score/score',
        name: '评分列表',
        component: './Score/Score',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/writing',
    name: '扩写管理',
    icon: 'setting',
    routes: [
      {
        path: '/writing',
        redirect: '/writing/scoringCriteria',
      },
      {
        path: '/writing/scoringCriteria',
        name: '评分标准管理',
        component: './ScoringCriteria/ScoringCriteria',
      },
      {
        path: '/writing/optimizeQuestions',
        name: '扩写提问管理',
        component: './OptimizeQuestions/OptimizeQuestions',
      },
      {
        path: '/writing/copywriting',
        name: '代写管理',
        component: './Copywriting/Copywriting',
      },
      {
        path: '/writing/copywritingHistory',
        name: '代写历史',
        component: './CopywritingHistory/CopywritingHistory',
      },
      {
        component: './404',
      },
    ],
  },
];
