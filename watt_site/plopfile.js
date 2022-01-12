/* eslint-disable max-len */
module.exports = function(plop) {
  plop.setGenerator('page', {
    description: 'Создание новой страницы',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Название страницы'
      },
      {
        type: 'list',
        name: 'type',
        message: 'Подключение к store',
        choices: ['statefull', 'stateless']
      }
    ],
    actions(data) {
      const actions = [
        {
          type: 'add',
          path: 'src/pages/{{properCase name}}/{{properCase name}}.js',
          templateFile: 'generators/page/Page.js.hbs'
        },
        {
          type: 'add',
          path:
            'src/pages/{{properCase name}}/{{properCase name}}Container.js',
          templateFile: 'generators/page/PageViewContainer.js.hbs'
        },
        {
          type: 'add',
          path:
            'src/pages/{{properCase name}}/components/index.js',
          templateFile: 'generators/page/PageViewComponentsIndex.js.hbs'
        }
      ];

      if (data.type === 'statefull') {
        actions.push({
          type: 'add',
          path: 'src/pages/{{properCase name}}/{{properCase name}}State.js',
          templateFile: 'generators/page/PageState.js.hbs'
        });
      }

      return actions;
    }
  });
};
