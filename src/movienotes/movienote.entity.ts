import {
    attribute,
    hashKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('movienotes')
export class Movienote {
    @hashKey()
    movienoteId: string;

    @attribute()
    movieId: string;

    @attribute()
    userId: string;

    @attribute()
    title: string;

    @attribute()
    imageUrl: string;
}