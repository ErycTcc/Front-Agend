export const formatarCPF = (cpf) => {
    console.log('dado', cpf)
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(cpfRegex, '$1.$2.$3-$4');
};
  