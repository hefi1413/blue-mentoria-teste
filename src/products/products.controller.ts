import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ProducPaymenttDto } from './dto/payment-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @ApiOperation({
    summary: 'Relizar o pagamento de um produto',
  })
  @Post('payment')
  paymentTerms(@Body() productPaymentDto: ProducPaymenttDto,
  ) {
    return this.productsService.productPayment(productPaymentDto);
  }

}
