import React from 'react';
import ProdutoService from '../../app/produtoService';
import { withRouter} from 'react-router-dom';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component{
    
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

    componentDidMount(){
        /* Recupera valor de parâmetro da URL */
        const sku = this.props.match.params.sku;
        
        if(sku){
            /* Método de array que filtra a lista com o parâmetro, return new array */
            const result = this.service.obterProdutos().filter( produto => produto.sku === sku );
            if(result.length === 1) {
                const produtoEncontrado = result[0];
                /* spread operator faz o match de atributos ao objeto de preenchimento */
                this.setState({...produtoEncontrado, atualizando: true});
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try{
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({ sucesso: true });
        }catch(erro){
            const errors = erro.errors;
            this.setState({errors : errors});
        }
        
    }

    limpaCampos = () => {
        this.setState(estadoInicial);
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    { this.state.atualizando ? 'Atualização ' : 'Cadastro ' }
                    de Produto
                </div>
                <div className="card-body">
                    <form id="frm-produto" onSubmit={this.onSubmit}>
                        { this.state.sucesso && 
                            <div className="alert alert-dismissible alert-success">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Sucesso</strong> Cadastro Realizado com Sucesso.
                            </div>
                        }

                        { this.state.errors.length > 0 &&
                            this.state.errors.map( msg => {
                                return(
                                <div className="alert alert-dismissible alert-danger">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>Erro</strong> {msg}
                                </div>
                                );
                            })
                            
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
                                        disabled={this.state.atualizando}
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
                                <button type="submit" className="btn btn-success"> { this.state.atualizando ? 'Atualizar ' : 'Salvar ' }</button>
                            </div>
                            <div className="col-md-1">
                                <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(CadastroProduto);