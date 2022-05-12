import './styles.css';

// Chama props como argumento para acessar as propriedades
// function Card(props) {
//     return(
//         <div className='card'>
//         <strong>{props.name}</strong>
//         <small>{props.time}</small>
//         </div>
//     )

// }

// Pode também ser desestruturado o props. Dessa forma podemos setar propriedades específicas para um mesmo componente.
function Card({ name, time }) {
  return (
    <div className="card">
      <strong>{name}</strong>
      <small>{time}</small>
    </div>
  );
}

export default Card;
