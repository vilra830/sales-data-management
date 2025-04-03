package io.nology.sales_data_management.config;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {

    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration().setSkipNullEnabled(true);
    mapper.typeMap(String.class, String.class).setConverter(new StringTrimConverter()); //do something everytime i turn a string into a nother string - I.E TRIMMING STRINGS
    return mapper;
    }

    private class StringTrimConverter implements Converter<String , String>{ 

        @Override
        public String convert(MappingContext<String, String> context) {
            if(context.getSource() == null){   // even if skip null is enabled - i still want to be extra careful hence this condition 
                return null;
            }
            return context.getSource().trim(); 
        }
    }

}
