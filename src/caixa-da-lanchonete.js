class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.some(item => item.endsWith(',0'))) {
            return 'Quantidade inválida!';
        };

        const cardapio = {
            cafe:{descricao: 'Café', valor: 3.0},
            chantily:{descricao: 'Chantily (extra do café)', valor: 1.5},
            suco:{descricao: 'Suco Natural', valor: 6.2},
            sanduiche:{descricao: 'Sanduíche', valor: 6.5},
            queijo:{descricao: 'queijo (extra do Sanduíche)', valor: 2.0},
            salgado:{descricao: 'Salgado', valor: 7.25},
            combo1:{descricao: '1 Suco e 1 Sanduíche', valor: 9.5},
            combo2:{descricao: '1 Café e 1 Sanduíche', valor: 7.5},
        };
    
        const metodosDePagamento = ['dinheiro', 'debito', 'credito'];
    
        //Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"
        if (!metodosDePagamento.includes(metodoDePagamento)){
            return 'Forma de pagamento inválida!';
        }
    
        let total = 0;
    
        for (const itemString of itens) {
            const [descricao, quantidadeString] = itemString.split(',');
            const quantidade = parseInt(quantidadeString, 10) || 1;
            const itemPrincipal=cardapio[descricao];
           
            //Se o código do item não existir, apresentar mensagem "Item inválido!"
            if (!itemPrincipal){
                return 'Item inválido!';
            }
            if (quantidade === 0) {
                return 'Quantidade inválida!';
            }
            
            if (itemPrincipal.descricao.toLowerCase() === 'queijo (extra do Sanduíche)' || itemPrincipal.descricao.toLowerCase() === 'chantily (extra do café)') {
                if (!itens.some(item => item.startsWith('combo'))) {
                    const itemPrincipalCodigo1 = itemPrincipal.descricao.toLowerCase() === 'chantily' ? 'café' : 'sanduíche';
                    const itemPrincipalCodigo2 = itemPrincipal.descricao.toLowerCase() === 'queijo' ? 'sanduíche' : 'café';
                    const itemPrincipalPresente = itens.some(item => item.startsWith(itemPrincipalCodigo2)) || itens.some(item => item.startsWith(itemPrincipalCodigo1));
                
                    if (!itemPrincipalPresente) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }
        }
    
            //Combos não são considerados como item principal.
        if (!descricao.startsWith('combo')) {
            total += itemPrincipal.valor*quantidade; 
        }
        }
        //DESCONTOS E TAXAS
        //Pagamento em dinheiro tem 5% de desconto
        if (metodoDePagamento === 'dinheiro'){
            total *= 0.95;
        //Pagamento a crédito tem acréscimo de 3% no valor total
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }
    
        //Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"
        if (total === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        
    
        

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

}

export { CaixaDaLanchonete };

