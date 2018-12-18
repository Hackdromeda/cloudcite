import { Contributor } from './contributor.model';
import { CitationDate } from './citation_date.model';

export interface Citation {
    id: string,
    type?: string,
    URL?: string, 
    contributors?: Contributor[],
    source?: string,
    archive?: string,
    archive_location?: string,
    ['call-number']?: string,
    ['container-title']?: string,
    dimensions?: string,
    edition?: number,
    ISBN?: number,
    medium?: string,
    ['number-of-volumes']?: number,
    ['number-of-pages']?: number,
    volume?: number,
    title?: string,
    ['title-short']?: string,
    genre?: string,
    publisher?: string,
    ['publisher-place']?: string,
    issued?: CitationDate,
    accessed?: CitationDate,
    abstract?: string
}