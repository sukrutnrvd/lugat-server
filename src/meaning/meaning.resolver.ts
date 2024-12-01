import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { Meaning } from 'src/graphql/models/meaning/meaning.model';
import { MeaningService } from './meaning.service';
import { UpdateMeaningInput } from 'src/graphql/inputs/meaning/update-meaning.input';

@Resolver()
export class MeaningResolver {
  constructor(private readonly meaningService: MeaningService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Meaning)
  async updateMeaning(
    @Args('meaning') meaningInput: UpdateMeaningInput,
    @Context('req') req: any,
  ) {
    return this.meaningService.updateMeaning(meaningInput, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Meaning)
  async deleteMeaning(@Args('id') id: string, @Context('req') req: any) {
    return this.meaningService.deleteMeaning(id, req.user.sub);
  }
}
