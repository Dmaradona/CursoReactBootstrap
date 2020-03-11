
const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors) {
    this.errors = errors;
}

export default class ProdutoService {

    obterProdutos = () => {
        let produtos = localStorage.getItem(PRODUTOS);
        return JSON.parse(produtos);
    }

    validar = (produto) => {
        const errors = [];

        if(!produto.nome){
            errors.push('Nome Inválido!');
        }
        if(!produto.sku){
            errors.push('SKU Inválido!');
        }
        if(!produto.descricao){
            errors.push('Descrição Inválido!');
        }
        if(!produto.preco || produto <= 0){
            errors.push('Preço Inválido!');
        }
        if(!produto.fornecedor){
            errors.push('Fornecedor Inválido!');
        }

        if(errors.length > 0){
            throw new ErroValidacao(errors);
        }
    }

    salvar = (produto) => {

        this.validar(produto);

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