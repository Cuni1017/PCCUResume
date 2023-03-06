package com.example.demo.service;

import com.example.demo.reponse.AuthenticationResponse;
import com.example.demo.dao.TokenRepository;
import com.example.demo.dao.UserRepository;
import com.example.demo.config.error.UserNotFoundException;
import com.example.demo.model.Token;
import com.example.demo.model.TokenType;
import com.example.demo.model.User;
import com.example.demo.dto.AuthenticationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final JwtService jwtService;
    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    public AuthenticationResponse login(AuthenticationDto request) {
        User user_data = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UserNotFoundException("查無帳號"));
        BCryptPasswordEncoder bcryptPasswordEncoder = new BCryptPasswordEncoder();
        boolean isPasswordMatche = bcryptPasswordEncoder.matches(request.getPassword(), user_data.getPassword());
        if (request.getUsername().equals(user_data.getUsername())) {
            if (isPasswordMatche) {
                var jwtToken = jwtService.generateToken(user_data);
                saveUserToken(user_data, jwtToken);
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();
            } else {
                throw new UserNotFoundException("密碼錯誤");
            }
        } else {
            throw new UserNotFoundException("帳號錯誤");
        }
    }
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
