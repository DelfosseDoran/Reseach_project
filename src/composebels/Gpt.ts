import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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
    'give the main diverce between these products' +
      JSON.stringify(product1) +
      ' and ' +
      JSON.stringify(product2) +
      ' short anser please'
  );

  return completion.choices[0].message.content;
};

const productname = async (product: any) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 
          'give the name of this product ' +
          JSON.stringify(product) +
          ' short anser please',
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  console.log(completion.choices[0].message.content);

  return completion.choices[0].message.content?.replace(
    'The name of the product is',
    ''
  );
};

export default () => {
  return {
    advice,
    diverece,
    productname,
  };
};
