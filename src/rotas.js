import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './views/home';
import CadastroProdutos from './views/produtos/cadastro';
import ConsultaProdutos from './views/produtos/consulta';

export default () => {
    return(
        <Switch>
            <Route exact={true} path='/cadastro-produtos/:sku?' component={CadastroProdutos} />
            <Route exact={true} path='/consulta-produtos' component={ConsultaProdutos} />
            <Route exact={true} path='/' component={Home} />
        </Switch>
    );
}