import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Department from "../components/Department"
import MessageForm from "../components/MessageForm"


function Home(){
  return(
    <>
       
      <Hero title={`The best health and service providers in the World!`} imageUrl='hero.png'/>
      <Biography imageUrl='biography.png'/>
      <Department/>
      <MessageForm/>
    </>
  )
}
export default Home;