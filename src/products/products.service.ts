import { BadRequestException, ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { ProducPaymenttDto } from './dto/payment-product.dto';


/*

obtem a taxa selic em tempo real de uma api externa

async function getSelic() {

  // data inicial
  let date = new Date();
  date.setDate(date.getDate() - 30)
  let dia =date.getDay();
  let mes =date.getMonth();
  let ano =date.getFullYear();

  const dtIni = ( dia < 10 ? '0'+ dia : dia ) + '/' + ( mes < 10 ? '0'+ mes : mes ) + '/' + ano; 

  // data final
  date = new Date();
  dia =date.getDay();
  mes =date.getMonth();
  ano =date.getFullYear();

  const dtFin = ( dia < 10 ? '0'+ dia : dia ) + '/' + ( mes < 10 ? '0'+ mes : mes ) + '/' + ano; 

  let url = "formato=json&dataInicial="+ dtIni + '&dataFinal' + dtFin;

  const response = await fetch( url,
    { method: 'GET' } 
  );
  const result = response.json();

  console.log( 'result:', result );

}

*/

@Injectable()
export class ProductService {
  constructor() {}

  async productPayment(dto: ProducPaymenttDto) {
    const _selic = +( process.env.SELIC || 13.75);
    const selic = _selic / 12;
    const response =[];

    if( !dto.produto.valor ) {
      throw new BadRequestException("O produto precisa possuir um valor!");
    }

    // tenta efetuar as operações armazenadas
    try {
      const amount = dto.condicaoPagamento.qtdeParcelas || 1;

      // valor do produto - valor entrada
      let vToCalc = dto.produto.valor - dto.condicaoPagamento.valorEntrada || 0;

      // preenche vetor de resposta
      let i =1;
      for ( ; i<= amount; i++ ) {
        // valor da parcela
        let quota =vToCalc / amount;
        // valor da parcela com juros
        if ( i > 5 ) {
          quota +=  ( selic * quota ) / 100;
        }
        response.push( { "numeroParcela": i, "valor": quota, "taxaJurosAoMes": i > 5 ? selic:  1 } );
      }

      return response;

    } catch (error) {
      console.log('error:', error);

      throw new BadRequestException("Não foi possível realizar o cálculo de pagamento do produto.");
    }

  }
}
