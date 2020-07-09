import React from 'react';

export default function IsShowAllButton(props) {
    return(
        <button onClick={() => {props.setIsShowAll(!props.isShowAll)}}>
            {props.isShowAll ? '未完了のみ表示' : '全て表示'}
        </button>
    );
}