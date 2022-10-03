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
import { BuyProductDto } from './dto/buy-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @ApiOperation({
    summary: 'Relizar o pagamento de um produto',
  })
  @Patch('payment')
  paymentTerms(@Body() productPaymentDto: BuyProductDto,
  ) {
    return this.productsService.productPayment(productPaymentDto);
  }

}
