
const PRODUTOS = '_PRODUTOS';

export default class ProdutoService {

    validar = (produto) => {
        const errors = [];

        if(!produto.nome){
            errors.push('Nome Inválido!');
        }
        if(!produto.sku){
            errors.push('Nome Inválido!');
        }
        if(!produto.descricao){
            errors.push('Nome Inválido!');
        }
        if(!produto.preco ){
            errors.push('Nome Inválido!');
        }
        if(!produto.nome){
            errors.push('Nome Inválido!');
        }

        if(errors.length > 0){
            throw Error(errors);
        }
    }

    salvar = (produto) => {
        let produtos = localStorage.getItem(PRODUTOS);

        if(!produtos){
            produtos = [];
        }else{
            produtos = JSON.parse(produtos);
        }

        produtos.push(produto);

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    }
}