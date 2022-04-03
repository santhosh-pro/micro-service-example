module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Generate the Code Enjoy!',
    prompts: [
      {
        type: 'list',
        name: 'singularName',
        message: 'Enter Usecase Name',
        choices: ['libary', 'application'],
      },
    ],
  });
};
