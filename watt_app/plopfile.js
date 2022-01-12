/* eslint-disable max-len */
module.exports = function(plop) {
  plop.setGenerator('module', {
    description: 'Генерация экрана',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Наименование экрана'
      }
    ],
    actions(data) {
      const actions = [
        {
          type: 'add',
          path: 'src/screens/{{properCase name}}/{{properCase name}}View.js',
          templateFile: 'generators/module/ModuleView.js.hbs'
        },
        {
          type: 'add',
          path:
            'src/screens/{{properCase name}}/{{properCase name}}ViewContainer.js',
          templateFile: 'generators/module/ModuleViewContainer.js.hbs'
        },

        {
          type: 'add',
          path: 'src/state/{{properCase name}}State.js',
          templateFile: 'generators/module/ModuleState.js.hbs'
        },
        {
          type: 'modify',
          path: 'src/store/reducer.js',
          pattern: /\/\/ ## Generator Reducer Imports/gi,
          template:
            "// ## Generator Reducer Imports\r\nimport {{properCase name}} from '../modules/{{properCase name}}/{{properCase name}}State';"
        },
        {
          type: 'modify',
          path: 'src/store/reducer.js',
          pattern: /\/\/ ## Generator Reducers/gi,
          template: '// ## Generator Reducers\r\n  {{properCase name}},'
        }
      ];

      return actions;
    }
  });
};
