
const GeneratePrompt = () => {
  return (
    <section className='w-full flex flex-start flex-col'>
        <textarea type="text" className='glassmorphism search_input mt-20' placeholder='Send a prompt' />
        <button className='btn mt-8'>Generate</button>
    </section>
  )
}

export default GeneratePrompt