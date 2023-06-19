export const formatarNumeroCelular = (numero) => {
    const regex = /^(\d{2})(\d)(\d{4})(\d{4})$/;
    return numero.replace(regex, '($1) $2 $3-$4');
};

export const removerFormatacao = (numero) => {
    return numero.replace(/\D/g, '');
}