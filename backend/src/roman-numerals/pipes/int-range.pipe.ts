import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**
 * Validates that the input parameter (represented by the `value` parameter on the `transform()` method) is inclusively
 * within the range given in the constructor; throws a BadRequestException if the input is not within this range.
 */
@Injectable()
export class IntRangePipe implements PipeTransform<number, number> {
    /**
     * Provides an IntRangePipe with the given lower limit and upper limit.
     * @param lowerLimit Minimum acceptable value for the input integer
     * @param upperLimit Maximum acceptable value for the input integer
     */
    constructor(
        private readonly lowerLimit: number,
        private readonly upperLimit: number,
    ) {}

    transform(value: number, _metadata: ArgumentMetadata) {
        if (value < this.lowerLimit || value > this.upperLimit) {
            throw new BadRequestException(`Parameter must be between ${this.lowerLimit} and ${this.upperLimit}`);
        }

        return value;
    }
}
