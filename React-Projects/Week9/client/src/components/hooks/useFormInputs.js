import { useEffect, useState } from 'react'

export default function useFormInputs() {
  const [inputs, setInputs] = useState({
    username:'',
    name:"",
    password:"",
    phoneNumber:"",
    confPassword:''
  });
  const handler = (e) => {
    setInputs((values) => ({ ...values, [e.target.name]:e.target.value }));
  }
  useEffect(() => {
    setInputs({
      username:'',
      name:"",
      password:"",
      phoneNumber:"",
      confPassword:''
    })
  }, [])
  return [
    inputs,
    handler
  ]
}
