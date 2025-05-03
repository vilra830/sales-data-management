package io.nology.sales_data_management.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.nology.sales_data_management.common.exceptions.BadRequestException;
import io.nology.sales_data_management.common.exceptions.NotFoundException;
import io.nology.sales_data_management.user.User;
import io.nology.sales_data_management.user.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<?> signUp(SignUpRequest request){
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            throw new BadRequestException("Username already taken");
        }

        User user = new User();
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            user.setRole(request.getRole());
            user.setActive(request.isActive());

        userRepository.save(user);
        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public ResponseEntity<?> login(LoginRequest request){
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(()-> new NotFoundException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(token));
    }

}
