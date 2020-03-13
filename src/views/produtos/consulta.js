import React from 'react';

import ProdutoService from '../../app/produtoService';
import Card from '../../components/card';
import ProdutosTable from './produtosTable';

import { WithRouter, withRouter } from 'react-router-dom';

class ConsultaProdutos extends React.Component {

    state = {
        produtos: []
    }

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    componentDidMount(){
        const produtos = this.service.obterProdutos();
        this.setState({ produtos : produtos})
    }

    preparaEditar = (sku) => {
        this.props.history.push(`/cadastro-produtos/${sku}`);
    }

    deletar = (sku) =>{
        const produtos = this.service.exluirProduto(sku);
        this.setState({produtos});
    }

    render(){
        return(
            <Card header="Consulta de Produtos">
                <ProdutosTable  produtos={this.state.produtos} 
                                editarAction={this.preparaEditar}
                                deletarAction={this.deletar}>

                </ProdutosTable>
            </Card>
        );
    }

}

export default withRouter(ConsultaProdutos);