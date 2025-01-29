'use client';

import { getQuiz } from '@/apis/quiz';
import { useQuery } from '@tanstack/react-query';

const Sample = () => {
  const { data } = useQuery({
    queryKey: ['quiz'],
    queryFn: getQuiz
  });

  return (
    <div>
      <h2>Category: {data.category}</h2>
      <h2>Level: {data.level}</h2>
      <h3>Details: {data.details}</h3>
      <div>
        <h2>Questions:</h2>
        <ul>
          {data.questions.map((question: any) => (
            <li key={question.id}>
              <strong>{question.title}</strong>
              <p>Type: {question.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sample;
