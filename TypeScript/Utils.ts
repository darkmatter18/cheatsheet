const utilities = {
  toggleItemFromList: (list: any[] = [], item: any, key: string = 'id', comparisonFunction?: (currentItem: any, item: any) => boolean) => {
        /*
          Typescript Utility funciton to toggle item from Array of object.
        */
        let updatedList: any[] = [...list];
        let index = list.findIndex(i => comparisonFunction ? comparisonFunction(i, item) : i[key] === item[key]);
        index === -1 ? updatedList.push(item) : updatedList.splice(index, 1);
        return updatedList;
    },
    updateItemList: (list: Array<any>, item: any, action: 'ADD' | 'DELETE' | 'UPDATE' | 'PUT', key: string = 'id'): typeof list => {
         /*
          Typescript Utility funciton to perform basic add , update , delete operation on an array of object.
          To Do : Modifiy it to handle number or string items also.
        */
        list = list || [];
        let newList = list.slice();
        let itemIndex;
        if (action === 'UPDATE') {
            itemIndex = newList.findIndex(listItem => item[key] === listItem[key]);
            if (itemIndex !== -1)
                newList.splice(itemIndex, 1, ({ ...list[itemIndex], ...item }));
            return newList;
        } else if (action === 'ADD') {
            newList.unshift(item);
            return newList;
        } else if (action === 'DELETE') {
            return newList.filter(listItem => item[key] !== listItem[key]);
        }
        else if (action === 'PUT') {
            itemIndex = newList.findIndex(listItem => item[key] === listItem[key]);
            if (itemIndex !== -1)
                newList.splice(itemIndex, 1, item);
            else {
                newList.unshift(item);
            }
            return newList;
        }
        return newList;
    },
};
export default utilities;
