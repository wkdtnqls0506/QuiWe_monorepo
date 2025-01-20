const HomePage = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz/1`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      return res.json()
    })
    .catch((err) => {
      console.error(err)
      return null
    })

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
  )
}

export default HomePage
