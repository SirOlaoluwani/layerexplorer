import React from 'react';
import BlocklistTabs from './components/blocklist-tabs';

export default function NewBlockList(props) {

    const { blocks } = props;

    return (
        <BlocklistTabs blocks={blocks} />
    )
}