import { useAuth } from "../store/Auth";

// export const Services = () => { 
//   const {service} =useAuth();

// return (

// <section className="section-services">

// <div className="container">

// <h1 className="main-heading">Services </h1>

// </div>

// <div className="container grid grid-three-cols">

// {service.map((curElem, index) => {

// return (

// < div className="card" key={index}>



// <p>{curElem.provider}</p>

// <p>{curElem.price}</p>


// <h2>{curElem.service}</h2>

// <p>{curElem.description}</p>

// </div>



// );

// })}

// </div>

// </section>

// );

// };


export const Services = () => {
  const { service } = useAuth();

  if (!Array.isArray(service)) {
    // Handle the case where service is not an array
    return <p>Error: Service data is not available.</p>;
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {service.map((curElem) => (
          <div className="card" key={curElem.id}>
            <h2>{curElem.service}</h2>
            <p>Provider: {curElem.provider}</p>
            <p>Price: {curElem.price}</p>
            <p>Description: {curElem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
