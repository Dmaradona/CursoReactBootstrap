
const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors) {
    this.errors = errors;
}

export default class ProdutoService {

    obterProdutos = () => {
        let produtos = localStorage.getItem(PRODUTOS);
        if(!produtos){
            return [];
        }
        return JSON.parse(produtos);
    }

    exluirProduto = (sku) => {
        let index = this.obterIndex(sku);
        if(index !== null){
            const produtos = this.obterProdutos();
            produtos.splice(index, 1);
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
            return produtos;
        }
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

    obterIndex = (sku) => {
        let index = null;
        this.obterProdutos().forEach((produto, i) => {
            if(produto.sku === sku){
                index = i;
            }
        });
        return index;
    }

    salvar = (produto) => {

        this.validar(produto);

        let produtos = localStorage.getItem(PRODUTOS);

        if(!produtos){
            produtos = [];
        }else{
            produtos = JSON.parse(produtos);
        }

        const index = this.obterIndex(produto.sku);
        if(index === null){
            produtos.push(produto);
        }else{
            produtos[index] = produto;
        }


        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    }
}