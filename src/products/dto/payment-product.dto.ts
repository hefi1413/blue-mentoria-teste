import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Payments } from '../entities/payments.entity';
import { Product } from '../entities/product.entity';

export class ProducPaymenttDto {

  @IsObject()
  @ApiProperty({
    description: 'Detalhes do produo',
    example: '{ "cod":"xxxxxxxxx-xxxxxxxxx-0", "name": "microsystems 150 Panasonic", "value": 1200.00 }'
  })
  produto: Product;  


  @IsObject()
  @ApiProperty({
    description: 'Detalhes do pagamento',
    example: '{ "entry": 500.00, "amount": 6 }'
  })
  condicaoPagamento: Payments;  

}
