const HomePage = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz/1`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })

  return <div>home</div>
}

export default HomePage
