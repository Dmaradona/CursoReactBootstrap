import React from 'react';
import ProdutoService from '../../app/produtoService';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false
}

export default class CadastroProduto extends React.Component{
    
    state = estadoInicial;

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        /* Dinâmico para preencher var do state usa-se colchetes */
        this.setState({ [nomeDoCampo]: valor })
    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.name,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        this.service.salvar(produto);

        this.limpaCampos();
        this.setState({ sucesso: true });
        
    }

    limpaCampos = () => {
        this.setState(estadoInicial);
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    Cadastro de Produto
                </div>
                <div className="card-body">

                    { this.state.sucesso && 
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Sucesso</strong> Cadastro Realizado com Sucesso.
                        </div>
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input  type="text" 
                                        name="nome" 
                                        onChange={this.onChange}
                                        value={this.state.nome} 
                                        className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>SKU: *</label>
                            <input  type="text" 
                                    name="sku" 
                                    onChange={this.onChange}
                                    value={this.state.sku}  
                                    className="form-control"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea   value={this.state.descricao} 
                                            name="descricao" 
                                            onChange={this.onChange}
                                            className="form-control"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input  type="text" 
                                        name="preco"
                                        onChange={this.onChange} 
                                        value={this.state.preco} 
                                        className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>Fornecedor: *</label>
                            <input  type="text" 
                                    name="fornecedor"
                                    onChange={this.onChange} 
                                    value={this.state.fornecedor} 
                                    className="form-control"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.onSubmit} className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}