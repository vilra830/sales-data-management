package io.nology.sales_data_management.common.exceptions;

public class BadRequestException extends RuntimeException {

    public BadRequestException (String message){
        super(message);
    }

}
