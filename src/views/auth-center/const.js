export const list = [
  {
    // active: true,
    id: '1392013552633589762',
    parentId: '-1',
    groupName: '采购',
    groupCode: 'warehouse_management',
    leafFlag: 0,
    status: 1,
    description: '权限组相关描述',
    children: [
      {
        id: '1392013874596753409',
        parentId: '1392013552633589762',
        groupName: '库存',
        groupCode: 'inventory',
        leafFlag: 0,
        status: 1,
        description: '库存',
        children: [
          {
            id: '1392014372271894529',
            parentId: '1392013874596753409',
            groupName: '仓库管理',
            groupCode: 'inventory_warehouse_manage',
            leafFlag: 1,
            status: 1,
            description: '仓库管理',
            children: null,
            operationAssetList: [
              {
                id: '1392016406597414913',
                description: '',
                groupId: '1392014372271894529',
                assetName: '仓库查询',
                assetCode: 'warehouse_search',
                assetMetadata: ' ',
                assetType: 1,
                type: 0,
                status: 1,
                editFlag: null,
                holdFlag: null,
                reason: null
              },
              {
                id: '1392016634251653122',
                description: '',
                groupId: '1392014372271894529',
                assetName: '仓库详情',
                assetCode: 'warehouse_detail',
                assetMetadata: ' ',
                assetType: 1,
                type: 0,
                status: 1,
                editFlag: null,
                holdFlag: null,
                reason: null
              },
              {
                id: '1392016765013274626',
                description: '',
                groupId: '1392014372271894529',
                assetName: '仓库修改',
                assetCode: 'warehouse_udpate',
                assetMetadata: ' ',
                assetType: 1,
                type: 0,
                status: 1,
                editFlag: null,
                holdFlag: null,
                reason: null
              },
              {
                id: '1392016848270209026',
                description: '',
                groupId: '1392014372271894529',
                assetName: '仓库禁用',
                assetCode: 'warehouse_ban',
                assetMetadata: ' ',
                assetType: 1,
                type: 0,
                status: 1,
                editFlag: null,
                holdFlag: null,
                reason: null
              }
            ],
            dataAssetList: null
          },
          {
            id: '1392014445210841089',
            parentId: '1392013874596753409',
            groupName: '库区管理',
            groupCode: 'inventory_area_manage',
            leafFlag: 1,
            status: 1,
            description: '库区管理',
            children: null,
            operationAssetList: null,
            dataAssetList: null
          },
          {
            id: '1392014522390228993',
            parentId: '1392013874596753409',
            groupName: '库位管理',
            groupCode: 'inventory_position_manage',
            leafFlag: 1,
            status: 1,
            description: '库位管理',
            children: null,
            operationAssetList: null,
            dataAssetList: null
          },
          {
            id: '1392014611485634561',
            parentId: '1392013874596753409',
            groupName: '库存明细',
            groupCode: 'inventory_detail_manage',
            leafFlag: 1,
            status: 1,
            description: '库存明细',
            children: null,
            operationAssetList: null,
            dataAssetList: null
          },
          {
            id: '1392014703479304194',
            parentId: '1392013874596753409',
            groupName: '出入库明细',
            groupCode: 'in_and_out_detail',
            leafFlag: 1,
            status: 1,
            description: '出入库明细',
            children: null,
            operationAssetList: null,
            dataAssetList: null,
            children: [
              {
                id: '1392014703479304194',
                parentId: '1392013874596753409',
                groupName: 'test',
                groupCode: 'in_and_out_detail',
                leafFlag: 1,
                status: 1,
                description: 'test',
                children: null,
                operationAssetList: null,
                dataAssetList: null
              }
            ]
          }
        ],
        operationAssetList: null,
        dataAssetList: null
      }
    ],
    operationAssetList: null,
    dataAssetList: null
  }
]
