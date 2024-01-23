import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const main = async () => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'what is the best phone for 500 euro' },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
};

const advice = async (question: string) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: question + ' short anser please' }],
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0].message.content;
};

const diverece = async (product1: any, product2: any) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 
          'give the main diverce between these products ' +
          JSON.stringify(product1) +
          ' and ' +
          JSON.stringify(product2) +
          ' short anser please',
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  console.log(
    'give the diverce between these products' +
      JSON.stringify(product1) +
      ' and ' +
      JSON.stringify(product2) +
      ' short anser please'
  );

  return completion.choices[0].message.content;
};

export default () => {
  return {
    main,
    advice,
    diverece,
  };
};
