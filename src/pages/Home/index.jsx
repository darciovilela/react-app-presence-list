import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import Card from '../../components/Card';

function Home() {
  // usestate é o nome de um hook no qual armazenamos estado dentro dele. o conteudo do estado e funcao que atualiza o estado. parte final da expressao diz que começa com valor vazio.
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  // const [clean, setClean] = useState([]);

  const [user, setUser] = useState({ name: '', avatar: '' });

  const cleanInput = useRef(null);

  function resetForm() {
    cleanInput.current.reset();
  }

  function handleAddStudent() {
    const newStudent = {
      // studentname é o local onde o meu estado está armazenado
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    // se deixo apenas assim, não vai adicionar um card para cada estudante. vai substituir sempre o mesmo card. princípio de imutabilidade.
    // setStudents([newStudent]);

    // dessa forma ele vai acrescentar sempre um novo card para cada estudante. O uso do spread é para tirar do array.
    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    // corpo do useffect. o useefect é chamado logo depois da renderizaçao da interface na tela. com os colchetes vazios ele vai executar por padrao apenas uma vez.
    // fetch é o padrao javascript para requests em apis
    fetch('https://api.github.com/users/darciovilela')
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil do user" />
        </div>
      </header>
      <form ref={cleanInput}>
        <input
          type="text"
          autoFocus
          placeholder="Digite o nome do aluno..."
          onChange={(e) => setStudentName(e.target.value)}
        />
      </form>
      <div className="buttons">
        <button className="button-add" onClick={handleAddStudent}>
          Adicionar
        </button>

        <button className="button-clean" onClick={resetForm}>
          Limpar nome
        </button>
      </div>

      {/* para componentes que são feitos a partir de loops é necessário colocar uma key para cada um. nesse caso foi usada time que muda rapidamente. */}
      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

export default Home;
