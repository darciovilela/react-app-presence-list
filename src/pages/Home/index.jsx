import React, { useState, useEffect } from 'react';
import './styles.css';

import Card from '../../components/Card';

function Home() {
  // usestate é o nome de um hook no qual armazenamos estado dentro dele. o conteudo do estado e funcao que atualiza o estado. parte final da expressao diz que começa com valor vazio.
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);

  const [user, setUser] = useState({ name: '', avatar: '' });

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
    // corpo do useffect. o useeffect é chamado logo depois da renderizaçao da interface na tela. com os colchetes vazios ele vai executar por padrao apenas uma vez.
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

      <input
        type="text"
        autoFocus
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {/* para componentes que são feitos a aprtir de loops é necessário colocar uma key para cada um */}
      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

export default Home;
