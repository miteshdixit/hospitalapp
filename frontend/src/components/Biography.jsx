/* eslint-disable react/prop-types */
function Biography({imageUrl}){
  return(
    <div className="container biography">
  <div className="banner">
    <img src={imageUrl} alt="aboutImg"/>
  </div>
  <div className="banner"> 
<p>Biography</p>
<h3>Who We Are</h3>
<p>Lorem ipsum dolor sit, repellendus incidunt placeat laudantium, cum dolores ipsa saepe accusantium velit explicabo omnis amet beatae voluptatibus sit id fugit autem necessitatibus.
Quasi iure porro, delectus autem ea asperiores voluptatum sunt, laborum atque rem necessitatibus ex eum. Quod obcaecati a labore aspernatur in explicabo ea alias. Incidunt optio qui dolorem consectetur assumenda?
Dignissimos atque consequuntur laborum quas, repellendus tenetur ex, Veritatis, voluptatibus! Incidunt, temporibus quaerat.
</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis molestiae odio reprehenderit nemo aut perspiciatis quibusdam consectetur veniam? Asperiores optio magni dignissimos, consequuntur mollitia voluptate commodi sint cumque facere accusantium.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis molestiae odio reprehenderit nemo aut perspiciatis quibusdam .</p>
  </div>
      
    </div>
  )
}
export default Biography;