import {Block} from "./block";

export const getTags = (blocks: Block[]): string[] => {
    let tagSet = new Set();
    blocks.map((block: Block) => {
        const tags = block.template.tags.split(',').map(item => item.toLowerCase().trim())
        tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet) as string[]
}

export const getBlocks = (blocks: Block[], tags: string[] = []) => {
    const filterTags = tags.map(tag => tag.toLowerCase().trim());
    return blocks.reduce((result: Block[], block) => {
        let match = true;
        filterTags.forEach(tag => match = match && (block.template.tags.toLowerCase().indexOf(tag) !== -1))
        if (match) {
            result.push(block)
        }
        return result;
    }, [])
}