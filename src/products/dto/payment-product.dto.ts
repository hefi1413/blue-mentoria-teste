import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Payments } from '../entities/payments.entity';
import { Product } from '../entities/product.entity';

export class ProducPaymenttDto {

  @IsObject()
  @ApiProperty({
    description: 'Detalhes do produo',
    example: '{ "codigo":"xxxxxxxxx-xxxxxxxxx-0", "nome": "microsystems 150 Panasonic", "valor": 1200.00 }'
  })
  produto: Product;  


  @IsObject()
  @ApiProperty({
    description: 'Detalhes do pagamento',
    example: '{ "valorEntrada": 500.00, "qtdeParcelas": 6 }'
  })
  condicaoPagamento: Payments;  

}
