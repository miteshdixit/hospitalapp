/* eslint-disable react/prop-types */
function Hero({title , imageUrl}){
  return(
    <div className="hero container">
   <div className="banner">
    <h1>{title}</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate officia praesentium rem laboriosam hic harum soluta, modi quaerat culpa, aliquid ratione assumenda incidunt. Deserunt nostrum quia ad molestias quis neque.
  </p>
   </div>
<div className="banner">
  <img src={imageUrl} alt="hero" className="animated-image"/>
  {/* <span>
    <img src="/vector.png" alt="vector"/>
  </span> */}
</div>
    </div>
  )
}
export default Hero;