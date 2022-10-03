import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { BuyProductDto } from './dto/buy-product.dto';


@Injectable()
export class ProductService {
  constructor() {}

  async productPayment(dto: BuyProductDto) {
    const selic = 13.75 / 12;
    const amount = dto.paymentTerms.amount || 1;
    const quotas =[]
   
    if( dto.product.value === 0 ) {
      throw new Error("O valor do produto não pode ser zero!");
    }

    // valor do produto - valor entrada
    let vToCalc = dto.product.value - dto.paymentTerms.initialValue;

    // tenta efetuar as operações armazenadas
    try {

      // preenche vetor de resposta
      let i =1;
      for ( ; i<= amount; i++ ) {
        // valor da parcela
        let quota =vToCalc / amount;
        // valor da parcela com juros
        if ( i > 5 ) {
          quota +=  ( selic * quota ) / 100;
        }
        quotas.push( { "numeroParcela": i, "valor": quota, "taxaJurosAoMes": selic } );
      }

      return quotas;

    } catch (error) {
      console.log('error:', error);

      return new Error("Não foi possível realizar o cálculo de pagamento do produto.");
    }

  }
}
