import { useEffect, useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Image from 'next/image';
import styled from 'styled-components';
import { colors, shadows } from '../ui/theme';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import Button from '../ui/button';
import { useSelector } from 'react-redux';

export const Contact = () => {
  const form: any = useRef();
  const { title } = useSelector(
    (rootReducer: any) => rootReducer.servicesReducer
  );

  const [size, setSize] = useState(650);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 768 ? 400 : 650);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formText = `Olá, gostaria de mais informações sobre ${title || 'seus serviços'}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: formText,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      message: `Olá, quero informações sobre ${title || 'seus serviços'}`,
    }));
  }, [title]);

  const { name, email, message } = formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name === '' || email === '' || (message === '' && form)) {
      return alert('Por favor, preencha todos os campos do formulário.');
    } else {
      sendEmail(e);
      setFormData({
        name: '',
        email: '',
        message: formText,
      });
    }
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_4t6bv2j',
        'template_8jc32ye',
        form.current,
        'RCq0RHnaSdjRp5ISW'
      )
      .then(
        () => {
          window.alert(
            `Mensagem enviada com sucesso! ✅ Aguarde a devolutiva, ou nos contate via whatsapp ${process.env.NEXT_PUBLIC_CELLPHONE_NUMBER}`
          );
        },
        () => {
          window.alert(
            `Erro ao enviar sua mensagem. ❌ Por favor tente novamente ou nos contate via whatsapp ${process.env.NEXT_PUBLIC_CELLPHONE_NUMBER}`
          );
        }
      );
  };

  return (
    <Section id='form'>
      <Form onSubmit={handleSubmit} ref={form}>
        <h2>Entre em contato</h2>
        <InputsContainers>
          <InputLabel htmlFor='my-input'>Nome da empresa:</InputLabel>
          <Input
            fullWidth
            id='my-input'
            aria-describedby='my-helper-text'
            name='name'
            value={name}
            onChange={handleChange}
            placeholder='NNConsulti'
          />
        </InputsContainers>
        <InputsContainers>
          <InputLabel htmlFor='my-input'>Email:</InputLabel>
          <Input
            fullWidth
            id='my-input'
            aria-describedby='my-helper-text'
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='nildete@nnconsulti.com.br'
          />
          <FormHelperText id='my-helper-text'>
            {' '}
            Não iremos compartilhar seu email.
          </FormHelperText>
        </InputsContainers>
        <InputsContainers>
          <TextField
            fullWidth
            id='outlined-basic'
            name='message'
            label='Como podemos te ajudar?'
            variant='outlined'
            value={message}
            onChange={handleChange}
          />
        </InputsContainers>
        <Button onSubmit={handleSubmit} text={'Enviar'} />
      </Form>
      <figure>
        <Image
          src='/contact.svg'
          width={size}
          height={size}
          alt='Ilustração com imagens de e-mail e celular'
        />
      </figure>
    </Section>
  );
};

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
  gap: 5%;
  margin-inline: 10%;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0;
    align-items: center;
    align-self: stretch;
    flex-direction: column;
    gap: 25%;

    form {
      width: 100%;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${colors.white};
  padding: 14px;
  border-radius: 10px;
  height: 90%;
  justify-content: inherit;

  h2 {
    text-align: center;
    color: ${colors.darkYellow};
    font-size: 32px;
    margin-top: 0px;
  }

  label,
  input {
    font-family: 'DM Sans', sans-serif !important;
    font-size: 18px;
    color: ${colors.black};
  }

  input {
    padding: 10px;
    box-shadow: ${shadows.inputsShadow};
  }

  input[name='message'] {
    height: 3.4375em !important;
  }
  button {
    background-color: ${colors.yellow};
  }

  button:hover {
    background-color: ${colors.darkYellow};
  }
`;

const InputsContainers = styled.div`
  margin-bottom: 20px;
`;
