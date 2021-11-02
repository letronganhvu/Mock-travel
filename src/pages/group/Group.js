import React, { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Container,
  Row
} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";


import { selectGroups, selectPage, selectSelectedRows, selectSize, selectTotalSize } from "../../redux/selectors/GroupSelector";
import { getListGroupAction, updateSelectedRowsAction } from "../../redux/actions/groupAction"
import { useEffect } from "react";
import groupApi from "../../api/GroupApi";
import CustomSearch from "./CustomSearch";
import * as Icon from 'react-feather';
import CustomFilter from "./CustomFilter";








const Group = (props) => {

  const getListGroup = props.getListGroupAction;

  const size = props.size;

  let onTotalMemberFilter;


  const handleTableChange = async (type, { page, sortField, sortOrder, searchText, filters }) => {


    //sort
    if (sortField === null || sortField === undefined || sortOrder === null || sortOrder === undefined) {
      sortField = "id"
      sortOrder = "desc"
    }

    //filters
    const filter = filters && filters.totalMember && filters.totalMember.filterVal ? filters.totalMember.filterVal : null;
    const minTotalMember = filter && filter.minTotalMember ? filter.minTotalMember : null;
    const maxTotalMember = filter && filter.maxTotalMember ? filter.maxTotalMember : null;

    const result = await groupApi.getAll(page, size, sortField, sortOrder, searchText, minTotalMember, maxTotalMember);
    const groups = result.content;
    const totalSize = result.totalElements;
    getListGroup(groups, page, totalSize, minTotalMember, maxTotalMember, searchText);
  }

  const [isVisibleFilter, setVisibleFilter] = useState(false);

  const handleChangeFilter = (minTotalMember, maxTotalMember) => {
    onTotalMemberFilter({
      minTotalMember,
      maxTotalMember
    })
  }

  const refreshForm = () => {
    //refresh selected rows
    props.updateSelectedRowsAction([]);

    handleTableChange(null,
      {
        page: 1,
        sortField: null,
        sortOrder: null,
        searchText: null,
        filters: null,
      }
    )
  }
  
  //create
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);


  const showNotification = (title, message) => {
    const options = {
      timeOut: 5000,
      showCloseButton: false,
      progressBar: true,
      position: "top-right"
    }

    toastr.success(title, message, options);
  }

  //update Group
  const [groupUpdateInfo, setgroupUpdateInfo] = useState();

  const updateGroup = async (groupId) => {
    setOpenModalUpdate(true);
    const groupInfo = await groupApi.getById(groupId);
    setgroupUpdateInfo(groupInfo);

  }

  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);

  //delete
  const handleOnSelect = (row, isSelect) => {
    let selected = props.selectedRows;

    if (isSelect) {
      
        selected = [...props.selectedRows, row.id]
      
    } else {
      
        selected = props.selectedRows.filter(x => x !== row.id)
      
    }
    props.updateSelectedRowsAction(selected);
  }

  const handleOnSelectAll = (isSelect, rows) => {
    let selected = props.selectedRows;

    const ids = rows.map(r => r.id);
    if (isSelect) {
        selected = ids
    } else {  
        selected = []
    }
    props.updateSelectedRowsAction(selected);
  }

  const deleteGroup = async () => {
    if(props.selectedRows.length !== 0) {
    try{
    await groupApi.deleteByIds(props.selectedRows);
    
    showNotification("Delete Group", "Delete Group Successfully");
    refreshForm();
  }catch(error){
    props.history.push("/auth/500");
  }
  }else{
    showErrorNotification("Delete Group", "You must select group!")
  }

}

const showErrorNotification = (title, message) => {
  const options = {
    timeOut: 3000,
    showCloseButton: false,
    progressBar: true,
    position: "top-right"
  }

  toastr.error(title, message, options);
}



  useEffect(() => {
    const getAllGroup = async () => {
      const result = await groupApi.getAll(1, size);
      const groups = result.content;
      const totalSize = result.totalElements;
      getListGroup(groups, 1, totalSize);
    }
    getAllGroup();

  }, [getListGroup, size])

  const actionFormatter = (cell, row, rowIndex) => {
    return (
      <Icon.Edit2 className="align-middle mr-2" size={16} onClick={() => updateGroup(row.id)} />
    );
  };

  const tableColumns = [
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "totalMember",
      text: "Total Member",
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) => {
        onTotalMemberFilter = onFilter;
        return null;
      },
    },
    {
      dataField: "action",
      text: "",
      formatter: actionFormatter,
      headerStyle: (colum, colIndex) => {
        return { width: '80px' };
      },
      align: () => {
        return 'center';
      }
    }
  ];

  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Group Management</h1>

      <Row>
        <Col>
          <Card>

            <CardBody>
              <ToolkitProvider
                keyField="name"
                data={props.groups}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      {isVisibleFilter &&
                        <Row>
                          <Col lg="12">
                            <CustomFilter handleChangeFilter={handleChangeFilter} />
                          </Col>

                        </Row>}
                      <Row>
                        <Col lg="3">
                          <CustomSearch {...toolkitprops.searchProps} />
                        </Col>
                        <Col lg="9" style={{ alignItems: 'center' }}>
                          <div className="float-right pull-right">
                            <Icon.Filter className="align-middle mr-2" size={24} onClick={() => setVisibleFilter(!isVisibleFilter)} />
                            <Icon.RefreshCw className="align-middle mr-2" size={24} onClick={refreshForm} />
                            <Icon.PlusCircle className="align-middle mr-2" size={24} onClick={() => setOpenModalCreate(true)} />
                            <Icon.Trash2 className="align-middle mr-2" size={24} onClick={deleteGroup} />
                          </div>
                        </Col>
                      </Row>

                      <Modal isOpen={isOpenModalCreate}>
                        <ModalHeader >
                          Create Group
                        </ModalHeader>
                        <Formik
                          initialValues={
                            {
                              name: ''
                            }
                          }
                          validationSchema={
                            Yup.object({
                              name: Yup.string()
                                .min(6, 'Must be between 6 and 50 characters')
                                .max(50, 'Must be between 6 and 50 characters')
                                .required('Required')
                                .test('checkUniqueName', 'This Group is already registered.', async name => {
                                  // call api
                                  const isExists = await groupApi.existsByName(name);
                                  return !isExists;
                                }),
                            })
                          }
                          onSubmit={
                            async values => {
                              try {
                                await groupApi.create(values.name);
                                //show notification
                                showNotification("Create Group", "Create Group Successfully");
                                //close modal
                                setOpenModalCreate(false);
                                //Refresh Table
                                refreshForm();
                              } catch (error) {
                                setOpenModalCreate(false);
                                props.history.push("/auth/500");
                              }

                            }
                          }
                          validateOnBlur={false}
                          validateOnChange={false}

                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <ModalBody className=" m-3">

                                <Row >
                                  <Col lg="auto">
                                    <label>Group Name:</label>
                                  </Col>
                                  <Col >
                                    <FastField
                                      style={{ display: "initial" }}
                                      type="text"
                                      bsSize="lg"
                                      name="name"
                                      placeholder="Enter Group Name"
                                      component={ReactstrapInput}
                                    />
                                  </Col>
                                </Row>


                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" type="submit" disabled={isSubmitting} >
                                  Save
                                </Button>{" "}
                                <Button color="primary" onClick={() => setOpenModalCreate(false)}>
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Form>
                          )}
                        </Formik>
                      </Modal>
                      <Modal isOpen={isOpenModalUpdate}>
                        <ModalHeader >
                          Update Group
                        </ModalHeader>
                        <Formik
                          enableReinitialize
                          initialValues={
                            {
                              name: groupUpdateInfo && groupUpdateInfo.name ? groupUpdateInfo.name : '',
                              totalMember: groupUpdateInfo && groupUpdateInfo.totalMember !== undefined && groupUpdateInfo.totalMember !== null ? groupUpdateInfo.totalMember : ''
                            }
                          }
                          validationSchema={
                            Yup.object({
                              name: Yup.string()
                                .min(6, 'Must be between 6 and 50 characters')
                                .max(50, 'Must be between 6 and 50 characters')
                                .required('Required')
                                .test('checkUniqueName', 'This Group is already registered.', async name => {
                                  // call api
                                  if (name === groupUpdateInfo.name) {
                                    return true;
                                  }
                                  const isExists = await groupApi.existsByName(name);
                                  return !isExists;
                                }),
                              totalMember: Yup.number()
                                .min(0, 'Must be greater or equal than 0 and interger')
                                .integer('Must be greater or equal than 0 and interger'),
                            })
                          }
                          onSubmit={
                            async values => {
                              try {
                                await groupApi.update(
                                  groupUpdateInfo.id,
                                  values.name,
                                  values.totalMember,
                                );
                                //show notification
                                showNotification("Update Group", "Update Group Successfully");
                                //close modal
                                setOpenModalUpdate(false);
                                //Refresh Table
                                refreshForm();
                              } catch (error) {
                                setOpenModalUpdate(false);
                                props.history.push("/auth/500");
                              }

                            }
                          }
                          validateOnBlur={false}
                          validateOnChange={false}

                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <ModalBody className=" m-3">

                                <Row >
                                  <Col lg="auto">
                                    <label>Group Name:</label>
                                  </Col>
                                  <Col >
                                    <FastField
                                      style={{ display: "initial" }}
                                      type="text"
                                      bsSize="lg"
                                      name="name"
                                      placeholder="Enter Group Name"
                                      component={ReactstrapInput}
                                    />
                                  </Col>
                                </Row>
                                <Row >
                                  <Col lg="auto">
                                    <label>Total Member:</label>
                                  </Col>
                                  <Col >
                                    <FastField
                                      style={{ display: "initial" }}
                                      type="number"
                                      bsSize="lg"
                                      name="totalMember"
                                      placeholder="Enter total member"
                                      component={ReactstrapInput}
                                    />
                                  </Col>
                                </Row>


                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" type="submit" disabled={isSubmitting} >
                                  Save
                                </Button>{" "}
                                <Button color="primary" onClick={() => setOpenModalUpdate(false)}>
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Form>
                          )}
                        </Formik>
                      </Modal>

                      <BootstrapTable
                        remote
                        {...toolkitprops.baseProps}
                        bootstrap4
                        striped
                        hover
                        bordered
                        pagination={paginationFactory({
                          page: props.page,
                          sizePerPage: props.size,
                          totalSize: props.totalSize,
                          hideSizePerPage: true,
                        })}
                        selectRow={{
                          mode: 'checkbox',
                          clickToSelect: true,
                          selected: props.selectedRow,
                          onSelect: handleOnSelect,
                          onSelectAll: handleOnSelectAll
                        }}
                        onTableChange={handleTableChange}
                        filter={filterFactory()}

                      />
                    </>
                  )
                }
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

const mapGlobalStateToProps = (state) => {
  return {

    groups: selectGroups(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state),
    selectedRows: selectSelectedRows(state),
  }
};

export default connect(mapGlobalStateToProps, { getListGroupAction, updateSelectedRowsAction })(Group);
